'use client'
export default function page1() {

  const Logout = async () => {
    document.cookie = 'session_token=; path=/; max-age=0;';
    window.location.reload();
  }
  return (
    <div>
      <div className="text-black text-center font-bold">
        Welcome to VMS, [Username TBA]
      </div>
      <div className="text-center ">
        <button onClick={Logout} className="cursor-pointer font-bold text-black"> Click to Logout</button>
      </div>
    </div>

  )
}

