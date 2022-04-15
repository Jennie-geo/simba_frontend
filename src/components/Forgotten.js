import React from 'react'

const Forgotten = () => {

    return (

        <form>
            <div className="form-group">
                <label>Reset Password</label>
                <input type="text" className="form-control" placeholder="Enter Password" name='reset_password' />
            </div>

            <button className="btn btn-primary btn-block">Login</button>

        </form>

    )
}

export default Forgotten