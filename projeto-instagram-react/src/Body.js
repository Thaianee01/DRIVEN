import Stories from './Stories';
import Posts from './Posts';
import SideBar from './SideBar';


export default function Body() {
    return (
        <main>
            <section>
                <Stories/>
                <Posts/>
            </section>

            <aside>
                <SideBar/>
            </aside>
        </main>
    );
}