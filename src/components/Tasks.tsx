import React, { useState } from "react";
import "./Tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const currentDate = new Date(); // Lấy ngày hiện tại
  const currentYear = currentDate.getFullYear();

  const getFirstWeekStartDate = (year) => {
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
    assignedBy: "",
    assignedTo: "",
    status: "",
    reported: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const navigate = useNavigate();

  const tasks = [
    {
      title: "Lập dự toán sửa chữa tàu 3",
      details: "Các ngành lập dự toán sửa chữa tàu 6, đ.c Ngưỡng tổng hợp gửi P.KH",
      status: "Đang thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Ngưỡng",
      assignedDate: "Mar 20, 2024",
      dueDate: "Dec 31, 2024",
      reported: "Đã báo cáo",
      id: 1,
      week: 11, // Thêm trường tuần
    },
    {
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 2,
      week: 11, // Thêm trường tuần
    },
    {
      title: "Khảo sát,ra phiếu YCVT sửa chữa máy hàn xưởng Vỏ",
      details: "Khảo sát chi tiết, lên phương án sc, ra phiếu YCVT gửi P.VT",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Thành",
      assignedTo: "Tiến",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 3,
      week: 12, // Thêm trường tuần
    },
    {
      title: "Lập dự toán sc TTB NM 2025",
      details: "Đẩy nhanh tiến độ lập dự toán, xin phê duyệt, ứng kinh phí, đảm bảo các TTB sc tàu",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Thành",
      assignedTo: "Hiền",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 4,
      week: 12, // Thêm trường tuần
    },
    {
      title: "Báo cáo KQ THNV tuần",
      details: "Hoàn thiện báo cáo tuần gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Khánh",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 5,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Tổng hợp kết quả sửa chữa TTB trong tuần",
      details: "",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Tuyến",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 6,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Báo cáo KQ khóa học CNC",
      details: "Báo cáo KQ thi lý thuyết, thực hành vận hành máy CNC",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Phó TP Biên",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 7,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 8,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 9,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 10,
      week: 13, // Thêm trường tuần
    },
    {
      title: "Tổng hợp BBKSCT tàu 5",
      details: "Các ngành soạn BBKSCT tàu 5 theo dự toán, đ.c Thường tổng hợp gửi P.KH",
      status: "Chưa thực hiện",
      assignedBy: "Phó TP Hoàng",
      assignedTo: "Thường",
      assignedDate: "Mar 22, 2024",
      dueDate: "Jan 15, 2025",
      reported: "Chưa báo cáo",
      id: 11,
      week: 13, // Thêm trường tuần
    },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.assignedBy ? task.assignedBy === filter.assignedBy : true) &&
      (filter.assignedTo ? task.assignedTo === filter.assignedTo : true) &&
      (filter.status ? task.status === filter.status : true) &&
      (filter.reported ? task.reported === filter.reported : true) &&
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
        <select className="form-select" onChange={(e) => setFilter({ ...filter, assignedBy: e.target.value })}>
          <option value="">Người giao việc</option>
          <option value="Phó TP Hoàng">Phó TP Hoàng</option>
          <option value="Phó TP Thành">Phó TP Thành</option>
        </select>
        <select className="form-select" onChange={(e) => setFilter({ ...filter, assignedTo: e.target.value })}>
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
        <select className="form-select" onChange={(e) => setFilter({ ...filter, reported: e.target.value })}>
          <option value="">Báo cáo</option>
          <option value="Đã báo cáo">Đã báo cáo</option>
          <option value="Chưa báo cáo">Chưa báo cáo</option>
        </select>
      </div>
      
      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Thứ tự</th>
            <th>Nội dung công việc</th>
            <th>Trạng thái</th>
            <th>Người giao việc</th>
            <th>Người thực hiện</th>
            <th>Ngày giao</th>
            <th>Thời hạn</th>
            <th>Báo cáo</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.map((task, index) => (
            <tr key={task.id}>
              <td>{(currentPage - 1) * tasksPerPage + index + 1}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.assignedBy}</td>
              <td>{task.assignedTo}</td>
              <td>{task.assignedDate}</td>
              <td>{task.dueDate}</td>
              <td>{task.reported}</td>
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