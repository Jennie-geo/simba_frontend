import React from 'react'
import '../index.css';

const Modal = (props) => {
    if (!props.show) {
        return null
    }
    return (
        <div>
            <div className='modal' onClick={Response.onClose}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <div className='modal-header'>
                        <h4 className='modal-title'> {props.title}</h4>
                    </div>
                    <div className='modal-body'> {props.children}</div>
                    <div className='modal-footer'>
                        <button className="btn btn-primary btn-block" onClick={props.onClose}>close</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal



//  {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    //             <div class="modal-dialog modal-dialog-centered" role="document">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
    //                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                             <span aria-hidden="true">&times;</span>
    //                         </button>
    //                     </div>
    //                     <div class="modal-body">
    //                         ...
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //                         <button type="button" class="btn btn-primary">Save changes</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div> */}