new Vue({
    el: "#app",
    mounted() {
        if (localStorage.getItem("tasks")) {
            this.listTasks = JSON.parse(localStorage.getItem("tasks"));
        }
    },
    data: {
        listTasks: [{ title: "Example", description: "UK", image: "./assets/img/example.jpg", date: "2024-05-10" }, { title: "Example", description: "UK", image: "./assets/img/example2.jpg", date: "2024-05-10" }],
        newTask: { title: "", description: "", image: null, date: "" }, // Initialize newTask with title, description, image, and date properties
        find: "",
    },
    methods: {
        addTasks() {
            if (this.newTask.title !== undefined) {
                this.listTasks.push({
                    title: this.newTask.title,
                    description: this.newTask.description,
                    image: this.newTask.image,
                    date: this.newTask.date // Include the date property
                });
                this.newTask = { title: "", description: "", image: null, date: "" }; // Reset newTask after adding
                localStorage.setItem("tasks", JSON.stringify(this.listTasks));
            }
        },
        deleteTask(e) {
            const title = e.target.parentElement.children[0].textContent;
            this.listTasks.splice(this.listTasks.findIndex(task => task.title == title), 1);
            localStorage.setItem("tasks", JSON.stringify(this.listTasks));
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.newTask.image = reader.result; // Set the image data to newTask
                };
            }
        }
    },

    computed: {
        findTask() {
            if (this.find != "") {
                return this.listTasks.filter(task => task.title.toLowerCase().includes(this.find.toLowerCase()));
            }
            return this.listTasks;
        }
    }
});
