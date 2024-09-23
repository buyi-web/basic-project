import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { Button } from 'antd';
import { userStore } from '@/store/userStore';

function Home() {
    const navigate = useNavigate();
    const userInfo = userStore((state) => state.userInfo)
    const setUserInfo = userStore((state) => state.userInfo)
    // const { userInfo, setUserInfo } = userStore(
    //     (state) => ({
    //       userInfo: state.userInfo,
    //       setUserInfo: state.setUserInfo,
    //     }),
    //   );
    return (
        <div className={styles.center}>
            <h1>Home</h1>
            <div>
                你好，{userInfo?.name}!
            </div>
            <Button type='primary' onClick={() => navigate('/login')}>注销</Button>
        </div>
    )
}

export default Home
