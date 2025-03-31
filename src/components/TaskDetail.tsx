import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TaskDetail.css";

const TaskDetail = () => {
  const { id } = useParams();

  const tasks = [
    {
      id: 1,
      title: "Lập dự toán sửa chữa tàu 3",
      details: "Các ngành lập dự toán sửa chữa tàu 6, đ.c Ngưỡng tổng hợp gửi P.KH",
      status: "Đang thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Ngưỡng",
      assignedDate: "Mar 20, 2024",
      dueDate: "Dec 31, 2024",
      reported: "Đã báo cáo",
      progress: 50,
    },
    {
      id: 2,
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      progress: 0,
    },
  ];

  const task = tasks.find(task => task.id === parseInt(id));
  return (
    <div className="container mt-4">
      {task ? (
      <>
        <h2>{task.title}</h2>
        <div className="row mt-3 text-start">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Thông tin chung</h5>
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>Tên công việc:</strong> {task.title}</p>
                <p className="mb-1"><strong>Mô tả:</strong> {task.details}</p>
                <p className="mb-1"><strong>Mã công việc:</strong> {task.id}</p>
                <p className="mb-1"><strong>Cách tính tiến độ công việc:</strong> Theo % người dùng tự cập nhật</p>
                <p className="mb-1"><strong>Ngày giao việc:</strong> {task.assignedDate}</p>
                <p className="mb-1"><strong>Người giao việc:</strong> {task.assignedBy}</p>
                <p className="mb-1"><strong>Người thực hiện:</strong> {task.assignedTo}</p>
                <p className="mb-1"><strong>Thời gian hoàn thành dự kiến:</strong> {task.dueDate}</p>
                <p className="mb-1"><strong>Theo dõi/phối hợp thực hiện:</strong> --</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Báo cáo công việc</h5>
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>Trạng thái:</strong> {task.status}</p>
                <p className="mb-1">
                  <strong>Tiến độ:</strong>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin={0} aria-valuemax={100}>{task.progress}%</div>
                  </div>
                </p>
                <div className="form-group mt-3">
                  <label htmlFor="reportContent"><strong>Nội dung báo cáo:</strong></label>
                  <textarea className="form-control" id="reportContent" rows="5" placeholder="Nhập nội dung báo cáo tại đây..."></textarea>
                </div>               
                <div className="form-group">
                  <label htmlFor="fileUpload"><strong>Tài liệu liên quan:</strong></label>
                  <input type="file" className="form-control" id="fileUpload" />
                  <small className="form-text text-muted">Kéo thả file vào đây để tải lên hoặc chọn từ máy</small>
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