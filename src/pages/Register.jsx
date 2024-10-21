import { useState } from 'react';

const SERVER_API_PATH = import.meta.env.VITE_SERVER_API_PATH;

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confPassword: '',
        restaurantName: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);

        try {
            const response = await fetch(`${SERVER_API_PATH}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                setMessage('Registration successful!');
                setMessageType('success');
            } else if (response.status === 409) {
                const errorData = await response.json();
                setMessage(errorData.message);
                setMessageType('error');
            } else {
                const error = await response.json();
                console.error('Error:', error);
                setMessage(`Registration failed: ${error.message}`);
                setMessageType('error');
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('Network error: Please try again later.');
            setMessageType('error');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required
                    />
                </p>
                <p>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$"
                        title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
                    />
                </p>
                <p>
                    <label>Confirm Password: </label>
                    <input 
                        type="password" 
                        name="confPassword"
                        value={formData.confPassword} 
                        onChange={handleChange} 
                        required
                    />
                </p>
                <p>
                    <label>Restaurant: </label>
                    <input 
                        type="text" 
                        name="restaurantName"
                        value={formData.restaurantName} 
                        onChange={handleChange} 
                        required
                    />
                </p>
                <p>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                    />
                </p>
                <button type="submit">Register</button>
            </form>
            {message && (
                <p style={{ color: messageType === 'success' ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Register;




