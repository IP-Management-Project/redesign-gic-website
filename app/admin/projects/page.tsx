import React from 'react'

function page() {
    return (
        <div>
            <h1>Search sort filter</h1>
            <h1>Click on card delete, unpublished, edit and create</h1>
            <p className='font-bold'>List all projects or loop projects card</p>
            <p>Click any card go to /admin/project/edit/[id]</p>
            <a href="/admin/projects/edit/2">Click to edit or modify</a>
        </div>
    )
}

export default page