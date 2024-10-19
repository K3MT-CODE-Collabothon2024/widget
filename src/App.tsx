import React, { useState } from 'react';
import './App.css';
import BaseWidget from './widgets/BaseWidget';
import DueTasksPopOut from './widgets/DueTasksWidget/DueTasksPopOut';
import DueTasksWidgetTight from './widgets/DueTasksWidget/DueTasksWidgetTight';
import DueTasksWidgetWide from './widgets/DueTasksWidget/DueTasksWidgetWide';
import Task from './widgets/DueTasksWidget/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Finish project report', completed: false, priority: 'high', deadline: new Date('2024-12-31'), category: 'Work' },
    { id: 2, text: 'Submit the assignment', completed: false, priority: 'medium', deadline: new Date('2024-12-15'), category: 'School' },
    { id: 3, text: 'Prepare for the presentation', completed: false, priority: 'low', deadline: new Date('2024-12-10'), category: 'Work' },
    { id: 4, text: 'Call the manager', completed: false, priority: 'medium', deadline: new Date('2024-12-20'), category: 'Work' },
    { id: 5, text: 'Buy groceries', completed: true, priority: 'low', deadline: new Date('2024-12-05'), category: 'Personal' },
  ]);
  
  const [isWide, setIsWide] = useState(false);
  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const tasksLeft = tasks.filter(task => !task.completed).length;
  return (
    <div className="App">
     
      <BaseWidget
        contentWidget={
          isWide ? (
            <DueTasksWidgetWide tasks={tasks} toggleComplete={toggleComplete} removeTask={removeTask}/>
          ) : (
            <DueTasksWidgetTight tasks={tasks} />
          )
        }
        contentPopup={
          <DueTasksPopOut 
            tasks={tasks} 
            toggleComplete={toggleComplete} 
            removeTask={removeTask} 
          />
        }
      />
      <button
        onClick={() => setIsWide(!isWide)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Toggle Widget Width
      </button>
    </div>
  );
}

export default App;