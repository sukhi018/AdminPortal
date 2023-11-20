import React, {useState} from 'react';
import './Styles/Admin.css';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {storeActions} from './Store/index';

function Admin() {
    const [newAdminUsername,
        setNewAdminUsername] = useState('');
    const [newAdminPassword,
        setNewAdminPassword] = useState('');
    const [resetConfirmation,
        setResetConfirmation] = useState(false);
    const [currentPassword,
        setCurrentPassword] = useState('');
    const [newPassword,
        setNewPassword] = useState('');
    const [validationErrors,
        setValidationErrors] = useState({newAdminUsername: '', newAdminPassword: '', currentPassword: '', newPassword: ''});

    const dispatch = useDispatch();

    const validateUsername = () => {
        const usernamePattern = /^(?=[a-zA-Z_])[a-zA-Z0-9_]*/;

        if (newAdminUsername.length < 4 || newAdminUsername.length > 20 || !usernamePattern.test(newAdminUsername)) {
            return 'Invalid Username';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (password.length < 8 || password.length > 30) {
            return 'Invalid password';
        }
        return '';
    };

    const handleAddAdmin = async() => {
        const usernameError = validateUsername();
        const passwordError = validatePassword(newAdminPassword);

        setValidationErrors({newAdminUsername: usernameError, newAdminPassword: passwordError, currentPassword: '', newPassword: ''});

        if (!usernameError && !passwordError) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, {
                    handle: newAdminUsername,
                    password: newAdminPassword
                });


            } catch (error) {
                if ( error.response.data.msg&&  error.response.data.msg.toLowerCase().includes('duplicate')) {
                  setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      newAdminUsername: 'Account already exists.'
                  }));
              } else {
                  setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      newAdminUsername: 'Server Error'
                  }));
              }
            }
        }

        setNewAdminUsername('');
        setNewAdminPassword('');
    };

    const handleResetQuestions = async() => {
        const confirmReset = window.confirm('Confirm question bank reset. Are you sure?');

        if (confirmReset) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/data/reset`, {
                    headers: {
                        Authorization: localStorage.getItem('chatToken')
                    }
                });
                if (res.data.success) {
                    dispatch(storeActions.trigger());
                    setResetConfirmation(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChangePassword = async() => {
        const currentPasswordError = validatePassword(currentPassword);
        const newPasswordError = validatePassword(newPassword);

        setValidationErrors({currentPassword: currentPasswordError, newPassword: newPasswordError, newAdminUsername: '', newAdminPassword: ''});

        if (!currentPasswordError && !newPasswordError) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/changePassword`, {
                    oldPassword: currentPassword,
                    newPassword: newPassword,

                }, {
                  headers: {
                      Authorization: localStorage.getItem('chatToken')
                  }}
              );
                console.log(res);
                setCurrentPassword('');
                setNewPassword('');
            } catch (error) {
              if ( error.response.data.msg&&  error.response.data.msg.toLowerCase().includes('old password')) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    currentPassword: 'Old password is wrong!'
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    currentPassword: 'Server Error'
                }));
            }            }
        }
    };

    return (
        <div className="admin_container">
            <div className="admin_section">
                <h3>Add New Admin</h3>
                <label>Username:</label>
                <input
                    type="text"
                    value={newAdminUsername}
                    onChange={(e) => setNewAdminUsername(e.target.value)}
                    onBlur={() => setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    newAdminUsername: validateUsername()
                }))}/> {validationErrors.newAdminUsername && <p>{validationErrors.newAdminUsername}</p>}
                <label>Password:</label>
                <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    onBlur={() => setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    newAdminPassword: validatePassword(newAdminPassword)
                }))}/> {validationErrors.newAdminPassword && <p>{validationErrors.newAdminPassword}</p>}
                <button onClick={handleAddAdmin}>Add Admin</button>
            </div>

            <div className="admin_section">
                <h3>Reset Questions</h3>
                <button onClick={handleResetQuestions}>Reset</button>
                {resetConfirmation && <p>Questions reset successfully!</p>}
            </div>

            <div className="admin_section">
                <h3>Change Password</h3>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    onBlur={() => setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    currentPassword: validatePassword(currentPassword)
                }))}/> {validationErrors.currentPassword && <p>{validationErrors.currentPassword}</p>}
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: validatePassword(newPassword)
                }))}/> {validationErrors.newPassword && <p>{validationErrors.newPassword}</p>}
                <button onClick={handleChangePassword}>Change Password</button>
            </div>
        </div>
    );
}

export default Admin;
