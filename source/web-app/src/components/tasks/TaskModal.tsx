import React, { useEffect, useState } from "react";
import { GetTask } from "../../services/task.service";
import './TaskModal.css'

interface TaskModalProps {
    id: number;
    closeModal: Function;
    save: Function;
}

const TaskModal = ({ id, closeModal, save } : TaskModalProps) => {
    const [detail, setDetail] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const getTask = async () => {
            try {
                if(id !== 0) {
                    const result = await GetTask(id);
                    if(result) {
                        setDetail(result.Details);
                    }
                    else {
                        closeModal();
                    }
                }
            }
            catch(err) {
                closeModal();
            }
        }

        getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const OnSave = () => {
        if(validateForm(detail)) {
            save(detail)
        }
    }

    const validateForm = (input: string) => {
        if(input) {
            setError(false);
            return true;
        }
        setError(true)
        return false;
    }

    const OnChangeDetail = (value: string) => {
        setDetail(value);
        validateForm(value);
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div>{ id === 0 ? 'Create task' : 'Edit task' }</div>
                    <div className="close" onClick={() => closeModal()}>✕</div>
                </div>
                <div className="title">Details<span className="required"> *</span></div>
                <div>
                    <textarea className={`detail ${error ? 'detail-error' : ''}`} rows={5} value={detail} onChange={(e) => OnChangeDetail(e.target.value)}></textarea>
                </div>
                <div className="button-group">
                    <button className="btn-cancel" onClick={() => closeModal()}>Cancel</button>
                    <button className="btn-save" onClick={OnSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal;
