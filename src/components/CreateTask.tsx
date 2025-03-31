import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateTask: React.FC = () => {
    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="col-md-8">
                <h2 className="text-center">Tạo mới công việc</h2>
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#info">Thông tin chung</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#advanced">Nâng cao</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="info">
                                <div className="form-group">
                                    <label>Mã công việc <span className="text-muted">(Tự nhập)</span></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Nhập tên công việc *</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label>Bắt đầu</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Kết thúc</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Người thực hiện</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Người giao việc</label>
                                    <input type="text" className="form-control" value="10Office.001 - Lê Việt Thắng" readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Người theo dõi/phối hợp thực hiện</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="tab-pane fade" id="advanced">
                                <div className="form-group">
                                    <label>Loại công việc</label>
                                    <select className="form-control">
                                        <option>Chọn loại công việc...</option>
                                        <option>Loại 1</option>
                                        <option>Loại 2</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Cách tính tiến độ công việc *</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Dự án</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả chi tiết công việc *</label>
                                    <textarea className="form-control" rows={4} required></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Đính kèm</label>
                                    <input type="file" className="form-control-file" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary">Cập nhật</button>
                    <button className="btn btn-secondary ml-2">Hủy bỏ</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;