import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTask: React.FC = () => {
    const Users = [
        "Trần Văn Ngưỡng", 
        "Hà Văn Thường"   
    ];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startAt, setStartAt] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignee, setAssignee] = useState(Users[0]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [notification, setNotification] = useState(''); // State cho thông báo

    const handleCreateTask = () => {
        const newTask = {
            title: title,
            description: description,
            creator: "Lê Nguyễn Ngọc Hoàng",
            assignee: assignee,
            created_at: Date.now(),
            start_at: new Date(startAt).getTime(),
            deadline: new Date(deadline).getTime()
        };

        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
        setStartAt('');
        setDeadline('');
        setAssignee(Users[0]);

        // Hiển thị thông báo
        setNotification('Công việc mới đã được tạo thành công!');
        setTimeout(() => {
            setNotification('');
        }, 3000); // Ẩn thông báo sau 3 giây
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="col-md-8">
                <h2 className="text-center">Tạo mới công việc</h2>
                {notification && (
                    <div className="alert alert-success" role="alert">
                        {notification}
                    </div>
                )}
                <div className="card text-start">
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="info">
                                <div className="form-group">
                                    <strong>Nhập tên công việc *</strong>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group mt-1">
                                    <label htmlFor="reportContent"><strong>Mô tả công việc:</strong></label>
                                    <textarea 
                                        className="form-control" 
                                        id="reportContent" 
                                        rows="3" 
                                        placeholder="Nhập nội dung mô tả tại đây..." 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} 
                                    ></textarea>
                                </div>                                                         
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <strong>Bắt đầu</strong>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            value={startAt}
                                            onChange={(e) => setStartAt(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <strong>Kết thúc</strong>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)} 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <strong>Người thực hiện</strong>
                                    <select 
                                        className="form-control" 
                                        value={assignee}
                                        onChange={(e) => setAssignee(e.target.value)}
                                    >
                                        {Users.map((user, index) => (
                                            <option key={index} value={user}>{user}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={handleCreateTask}>Tạo công việc</button>
                </div>
                {/* <div className="mt-4">
                    <h3>Mảng công việc đã tạo</h3>
                    <pre>{JSON.stringify(tasks, null, 2)}</pre>
                </div> */}
            </div>
        </div>
    );
};

export default CreateTask;