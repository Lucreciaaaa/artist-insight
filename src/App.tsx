import Main from './components/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <Main />
      <Sidebar />
    </div>
  );
}
