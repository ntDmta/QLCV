import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TaskDetail.css";
import { useState } from 'react';

const TaskDetail = () => {
  const { id } = useParams();
  const [reportContent, setReportContent] = useState("");
  const [status, setStatus] = useState(""); // Trạng thái mặc định
  const [progress, setProgress] = useState(); // Tiến độ mặc định
  const [feedbackContent, setfeedbackContent] = useState(""); // Nhận xét
  const [notification, setNotification] = useState(''); // State cho thông báo

  const handleUpdateReport = () => {
    const newReport = {
      created_at: Math.floor(Date.now() / 1000), // Thời gian hiện tại
      creator: "Người báo cáo", // Thay thế bằng tên người dùng hiện tại
      report: reportContent,
    };

    // Thêm newReport vào mảng reports
    tasks[0].reports.push(newReport); // Cập nhật mảng reports
    //setReportContent(""); // Reset nội dung báo cáo
    // Cập nhật trạng thái và tiến độ
    tasks[0].status = status; // Cập nhật trạng thái
    tasks[0].progress = progress; // Cập nhật tiến độ
    setTasks([...tasks]); // Cập nhật lại state tasks    

    // Hiển thị thông báo
    setNotification('Cập nhật báo cáo công việc thành công!');
    setTimeout(() => {
    setNotification('');
    }, 3000); // Ẩn thông báo sau 3 giây
  };

  const handleUpdatefeedback = () => {
    const newfeedback = {
      created_at: Math.floor(Date.now() / 1000), // Thời gian hiện tại
      creator: "Tên người nhận xét", // Thay thế bằng tên người dùng hiện tại
      Content: feedbackContent,
    };
    // Thêm newReport vào mảng reports
    tasks[0].feedback.push(newfeedback); // Cập nhật mảng reports
    setTasks([...tasks]); // Cập nhật lại state tasks
    // Hiển thị thông báo
    setNotification('Cập nhật chỉ đạo, nhận xét thành công!');
    setTimeout(() => {
    setNotification('');
    }, 3000); // Ẩn thông báo sau 3 giây    
  };

  const [tasks, setTasks] = useState([ // Sử dụng useState để quản lý tasks
    {
      id: "hjshfmwuwe2781duwe",
      title: "Tổng hợp BBKSCT tàu 5",
      description: "Các ngành soạn BBKSCT theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "doing",
      creator: "Lê Nguyễn Ngọc Hoàng",
      assignee: "Hà Văn Thường",
      created_at: 1111113431,
      start_at: 111111111111,
      deadline: 1113321111,
      progress: 50,
      week: 13,
      feedback: [
        {
          created_at: 2743460600,
          creator: "Lê Nguyễn Ngọc Hoàng",
          Content: "Tiếp tục hoàn thiện trong tuần tiếp theo"
        },
      ],
      reports: [
        {
          id: "hiujfaassl",
          created_at: 2743460600,
          creator: "Hà Văn Thường",
          report: "Đã tổng hợp xong 11 bb"
        },
        {
          id: "hiujkl",
          created_at: 2743460600,
          creator: "Hà Văn Tường",
          report: "Đã tổng hợp xong 15 bb"
        }
      ],
    },
  ]);

  const task = tasks.find(task => task.id === id); // Sửa so sánh id

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {timeZone: "Asia/Bangkok"});
  } // Hàm định dạng ngày

  return (
    <div className="container mt-4">
      {task ? (
      <>
        <h2>{task.title}</h2>
        <div className="row mt-3 text-start">
          {notification && (
            <div className="alert alert-success text-center" role="alert">
              {notification}
            </div>
          )}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Thông tin chung</h5>
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>Tên công việc:</strong> {task.title}</p>
                <p className="mb-1"><strong>Mô tả:</strong> {task.description}</p>
                <p className="mb-1"><strong>Mã công việc:</strong> {task.id}</p>
                <p className="mb-1"><strong>Công việc tuần:</strong> {task.week}</p>
                <p className="mb-1"><strong>Ngày giao việc:</strong> {formatDate(task.created_at)}</p>
                <p className="mb-1"><strong>Thời hạn hoàn thành:</strong> {formatDate(task.deadline)}</p>
                <p className="mb-1"><strong>Người giao việc:</strong> {task.creator}</p>
                <p className="mb-1"><strong>Người thực hiện:</strong> {task.assignee}</p>
                <p className="mb-1"><strong>Trạng thái:</strong> {task.status}</p>
                <p className="mb-1"><strong>Tiến độ công việc:</strong>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin={0} aria-valuemax={100}>{task.progress}%</div>
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card">
              <div className="card-header">
                <h5>Nội dung báo cáo</h5>
              </div>
              <div className="card-body">
                {task.reports.map((report, index) => (
                  <div key={index}>
                    <strong>{report.creator}:</strong> {report.report} (Ngày: {formatDate(report.created_at)}).
                  </div>
                ))}
              </div>
              <div className="card-header">
                <h5>Chỉ đạo, nhận xét</h5>
              </div> 
              <div className="card-body">
                {task.feedback.map((feedback, index) => (
                  <div key={index}>
                    <strong>{feedback.creator}:</strong> {feedback.Content} (Ngày: {formatDate(feedback.created_at)}).
                  </div>
                ))}
              </div>
              <div className="form-group mt-1">
                <label htmlFor="feedbackContent"><strong>Nhận xét:</strong></label>
                <textarea 
                  className="form-control" 
                  id="feedbackContent" 
                  rows="3" 
                  placeholder="Nhập nhận xét tại đây..." 
                  value={feedbackContent}
                  onChange={(e) => setfeedbackContent(e.target.value)} // Cập nhật state
                ></textarea>
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleUpdatefeedback}>Cập nhật</button>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h5>Báo cáo công việc</h5>
              </div>
              <div className="card-body">
                <div className="form-group mt-3">
                  <label htmlFor="statusSelect"><strong>Trạng thái:</strong></label>
                  <select 
                    className="form-control" 
                    id="statusSelect" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} // Cập nhật trạng thái
                    >
                    <option value="open">open</option>
                    <option value="close">close</option>
                    <option value="cancel">cancel</option>
                    <option value="doing">doing</option>
                    <option value="completed">completed</option>
                    <option value="feedback">feedback</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="progressInput"><strong>Tiến độ (%):</strong></label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="progressInput" 
                    placeholder="Nhập tiến độ công việc" 
                    min="0" 
                    max="100" 
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)} // Cập nhật tiến độ
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="reportContent"><strong>Nội dung báo cáo:</strong></label>
                  <textarea 
                    className="form-control" 
                    id="reportContent" 
                    rows="5" 
                    placeholder="Nhập nội dung báo cáo tại đây..." 
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)} // Cập nhật state
                  ></textarea>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-primary" onClick={handleUpdateReport}>Cập nhật</button>
                </div>               
              </div>
            </div>
          </div>
        </div>
      </>
      ) : (
        <p>Công việc không tồn tại.</p>
      )}
    </div>
  );
};

export default TaskDetail;