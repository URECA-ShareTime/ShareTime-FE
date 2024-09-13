import Header from '../components/common/header/Header';
import myProfileImg from '../assets/profileimage.png';
import LeftBar from '../components/common/leftbar/LeftBar';

export default function MainPage() {
    return (
        <>
            <Header img={myProfileImg}/>
            <LeftBar />
            {/* <Calendar /> */}
            {/* <TodoList /> */}
        </>
    );
}