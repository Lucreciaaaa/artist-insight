import Main from './components/main/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <Main />
      <Sidebar />
    </div>
  );
}
