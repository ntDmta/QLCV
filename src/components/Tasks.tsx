import React, { useState } from "react";
import "./Tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const currentDate = new Date(); // Lấy ngày hiện tại
  const currentYear = currentDate.getFullYear();

  const getFirstWeekStartDate = (year: number) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstDayOfWeek = firstDayOfYear.getDay(); // Ngày trong tuần (0 = Chủ nhật, 1 = Thứ hai, ...)
    
    // Tính toán ngày đầu tiên của tuần đầu tiên (thứ Hai)
    const daysToFirstMonday = (firstDayOfWeek === 0) ? 1 : (1 - firstDayOfWeek + 7) % 7;
    return new Date(year, 0, 1 + daysToFirstMonday);
  };

  const getWeekNumber = (date) => {
    const firstWeekStartDate = getFirstWeekStartDate(date.getFullYear());
    const days = Math.floor((date - firstWeekStartDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
  };

  const createWeeksForYear = (year) => {
    const weeks = [];
    const firstWeekStartDate = getFirstWeekStartDate(year);
    const currentDate = new Date(year, 11, 31); // Ngày cuối cùng của năm

    let weekNumber = 1;
    let currentWeekStartDate = firstWeekStartDate;

    while (currentWeekStartDate.getFullYear() === year) {
      const weekEndDate = new Date(currentWeekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6); // Thêm 6 ngày để có ngày cuối tuần

      weeks.push({
        week: weekNumber,
        start: currentWeekStartDate.toLocaleDateString("en-GB"), // Định dạng ngày
        end: weekEndDate.toLocaleDateString("en-GB"),
      });

      currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7); // Chuyển sang tuần tiếp theo
      weekNumber++;
    }

    return weeks;
  };

  const weeks = createWeeksForYear(currentYear);
  const currentWeek = getWeekNumber(currentDate);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    creator: "",
    assignee: "",
    status: "",
    reports: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const navigate = useNavigate();

  const tasks = [
    {
      id: "hjsdhquwe2781duwe",
      title: "Lập dự toán sửa chữa tàu 3",
      description: "Các ngành lập dự toán sửa chữa tàu 6, đ.c Ngưỡng tổng hợp gửi P.KH",
      status: "doing",
      creator: "Lê Nguyễn Ngọc Hoàng",
      assignee: "Trần Văn Ngưỡng",
      created_at: 1111111,
      start_at: 111111111111,
      deadline: 1111111111,
      progress: 99,
      week: 13,
      feedback: [
        {
          created_at: 2743460600,
          creator: "Lê Nguyễn Ngọc Hoàng",
          Content: "OK em"
        },
      ],
      reports: [
        {
          id: "hiujfaassl",
          created_at: 2743460600,
          creator: "Trần Văn Ngưỡng",
          report: "Các ngành đã nộp dự toán"
        },
        {
          id: "hiujkl",
          created_at: 2743460600,
          creator: "Trần Văn Ngưỡng",
          report: "Đã gửi dự toán cho P.KH"
        }
      ],
    },
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
          Content: "OK em"
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
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.creator ? task.creator === filter.creator : true) &&
      (filter.assignee ? task.assignee === filter.assignee : true) &&
      (filter.status ? task.status === filter.status : true) &&
      (filter.reports ? task.reports.some(report => report.report === filter.reports) : true) &&
      task.week === selectedWeek // Lọc theo tuần
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h5 className="me-2">Danh sách công việc</h5>
          <select
            className="form-select w-auto"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
          >
            {weeks.map((week) => (
              <option key={week.week} value={week.week}>
                Tuần {week.week} ({week.start} - {week.end})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/CreateTask')}>Tạo công việc mới</button>
      </div>
      
      <div className="filter-group">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Tìm kiếm nội dung công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="form-select" onChange={(e) => setFilter({ ...filter, creator: e.target.value })}>
          <option value="">Người giao việc</option>
          <option value="Phó TP Hoàng">Phó TP Hoàng</option>
          <option value="Phó TP Thành">Phó TP Thành</option>
        </select>
        <select className="form-select" onChange={(e) => setFilter({ ...filter, assignee: e.target.value })}>
          <option value="">Người thực hiện</option>
          <option value="Ngưỡng">Ngưỡng</option>
          <option value="Thường">Thường</option>
          <option value="Tiến">Tiến</option>
          <option value="Hiền">Hiền</option>
          <option value="Khánh">Khánh</option>
          <option value="Tuyến">Tuyến</option>
          <option value="Phó TP Biên">Phó TP Biên</option>
        </select>
        <select className="form-select" onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="">Trạng thái</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Chưa thực hiện">Chưa thực hiện</option>
        </select>
        <select className="form-select" onChange={(e) => setFilter({ ...filter, reports: e.target.value })}>
          <option value="">Báo cáo</option>
          <option value="Đã báo cáo">Đã báo cáo</option>
          <option value="Chưa báo cáo">Chưa báo cáo</option>
        </select>
      </div>
      
      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>TT</th>
            <th>Nội dung công việc</th>
            <th>Trạng thái</th>
            <th>Người giao việc</th>
            <th>Người thực hiện</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Tiến trình thực hiện</th>
            <th>Báo cáo</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{(currentPage - 1) * tasksPerPage + index + 1}</td>
              <td><div className="TaskTitle text-start">{task.title}</div></td>
              <td>{task.status}</td>
              <td>{task.creator}</td>
              <td>{task.assignee}</td>
              <td>{new Date(task.created_at * 1000).toLocaleDateString("en-US", {timeZone: "Asia/Bangkok"})}</td>
              <td>{new Date(task.deadline * 1000).toLocaleDateString("en-US", {timeZone: "Asia/Bangkok"})}</td>
              <td>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin={0} aria-valuemax={100}>{task.progress}%</div>
                </div>
              </td>
              <td>{task.reports.length > 0 && `${task.reports[task.reports.length - 1].report}`}</td>
              <td>
                <button className="btn-details" onClick={() => navigate(`/tasks/${task.id}`)}>
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Trang trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} className={index + 1 === currentPage ? "active" : ""} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default TaskManagement;