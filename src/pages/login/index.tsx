import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <Button type="primary" onClick={() => navigate('/home')}>登录</Button>
        </div>
    )
}
