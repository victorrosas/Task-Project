import React, {useState, useEffect} from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';
import moment from 'moment';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updatet_ate: Date;
}

interface IParamsProps {
    id: string;
}

const Detail: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<IParamsProps>();
    const [task, setTask] = useState<ITask>();

    useEffect(() =>{
        findTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    function back() {
        history.goBack();
    }

    async function findTask() {
        const response = await api.get<ITask>(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)
    }

    function formatDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY");
    }

  return (
    <div className="container">
    <br/>
        <div className="task-header">
            <h1>Task Detail</h1>
            <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
        </div>
    <br/>

    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{ task?.title}</Card.Title>
            <Card.Text>
                {task?.description}
                <br/>
                <Badge variant={task?.finished ? "success" : "warning"}>
                    {task?.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>
                <br/>
                <br/>
                <strong>Data de Cadastro:{' '}
                <Badge variant="info">
                    { formatDate(task?.created_at) }
                </Badge >
                 </strong>
                <br/>
                <strong>Data de Atualização:{' '}
                <Badge variant="info">
                    { formatDate(task?.updatet_ate) }
                </Badge >
                </strong>
            </Card.Text>
        </Card.Body>
    </Card>
    </div>
  );
}

export default Detail;