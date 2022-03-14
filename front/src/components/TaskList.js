import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() { 
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async() => {
    try {
      const resp = await fetch('http://localhost:4000/tasks');
      const data = await resp.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async(id) => {
    
    try {
      await fetch(`http://localhost:4000/tasks/${id}`,{
        method: "DELETE"
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    loadTasks();
  }, [])

  return(
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
          <Card style={{marginBottom: ".8rem", backgroundColor: '#1e272e'}} key={task.id}>
            <CardContent style={{display: "flex", justifyContent:"space-between"}}>
              <div style={{color: 'white'}}>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>
              <div>
                <Button variant='contained' color='inherit' onClick={() => navigate(`/task/${task.id}/edit`)}>
                  Edit
                </Button>
                <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} style={{marginLeft: ".5rem"}}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  ) 
}
