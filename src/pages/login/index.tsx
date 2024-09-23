import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { userStore } from '@/store/userStore';
export default function Login() {
    const navigate = useNavigate();
    const setUserInfo  = userStore((state) => state.setUserInfo)
    const login = () => {
        setUserInfo({
            name: 'admin',
            age: 18,
            email: 'xxxxxx@tzzn.com'
        })
        navigate('/')
    }
    return (
        <div>
            <Button type="primary" onClick={login}>登录</Button>
        </div>
    )
}
