import NavBar from './NavBar';
import Body from './Body';

export default function App() {
    return (
    <>
        <NavBar/>
        <div className = "main-content">
           <Body/> 
        </div>
        
    </>
    );
}