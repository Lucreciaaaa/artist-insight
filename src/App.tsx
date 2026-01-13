function App() {
  return (
    <div className="flex h-screen ">
      {/* left column */}
      <div className="grow">
        <div className="p-9"></div>
      </div>

      {/* right column */}
      <div className="w-96 shrink-0 border-l border-gray-400">
        <div className="p-6"></div>
      </div>
    </div>
  )
}

export default App
