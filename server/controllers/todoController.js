

export const todoCont = (req, res) => {
    res.status(200).send('<h1>Hi! Welcome to server</h1>')
}

export const createTodoController = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please provide title and description",
            });
        }
        const todo = new todoModel({ title, description, createdBy });
        const result = await todo.save();
        res.status(201).send({
            success: true,
            message: 'Task created!',
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "erorr in create todo api",
            error,
        });
    }
}

//GET TODO
export const getTodoController = async (req, res) => {
    try {

        const { userId } = req.params;
        //validate
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "No User Found with this id",
            });
        }
        //find task
        const todos = await todoModel.find({ createdBy: userId });
        if (!todos) {
            return res.status(404).send({
                success: true,
                message: "you have no todos ",
            });
        }
        res.status(200).send({
            success: true,
            message: "Your Todos",
            todos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Todo API",
            error,
        });
    }
}

//DELETE TODO
export const deleteTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "No todo found with this id",
            });
        }
        //find id
        const todo = await todoModel.findByIdAndDelete({ _id: id });
        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "No task found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Your Task Has Been Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in dlete todo api",
        });
    }
};