import User from './User';
import Suggestions from './Suggestions';

export default function SideBar() {
    return (
        <div className="sidebar">
            <User />
            <Suggestions />
        </div>
    );
}

