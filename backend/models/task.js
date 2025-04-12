const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: String,
    subject: String,
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    dueDate: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

/*
The enum keyword tells Mongoose:

“Only these exact values are allowed for this field.”

So in this case:

enum: ['Not Started', 'In Progress', 'Completed']
This means the status field must be one of these three values:

'Not Started'

'In Progress'

'Completed'

If you try to save a task with status 'Almost Done' or 'Paused', MongoDB will reject it and throw a validation error.

🧠 Why use enum?
Prevents typos in the database (like 'completed' vs 'Completed')

Keeps your data clean and predictable

Helps with dropdown menus in the frontend — you always know what values are valid
*/




/*
default: Default Value if None is Given
This part:


default: 'Not Started'
means:

“If no value is provided for status, automatically set it to 'Not Started'.”

So when a new task is created like this:

const task = new Task({
  title: 'Revise DSA',
  subject: 'Computer Science'
});
await task.save();
Even though we didn’t specify status, it will automatically save:

status: 'Not Started'
That way, we don't have to explicitly set it every time — Mongoose will handle it.


*/

