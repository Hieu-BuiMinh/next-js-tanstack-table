import React from 'react'

interface IAdminLayout{
  children: React.ReactNode
}

function AdminLayout({children}:Readonly<IAdminLayout>) {
  return (
    <div>
      {children}
    </div>
  )
}

export default AdminLayout
