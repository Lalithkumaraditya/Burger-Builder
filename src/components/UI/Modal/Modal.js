import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Modal/Backdrop/Backdrop'

import  './Modal.css';
class  Modal extends Component{
shouldComponentUpdate(nextProps,nexrState){
  return (nextProps.show !== this.props.show || nextProps.children !== this.props.children) ;
}
componentWillUpdate(){
    console.log('[Model.js] Update..')
}
    render(){
        return(<Aux>
            <Backdrop show={this.props.show} />
            <div className='Modal'   onClick={this.props.modalClosed}
            style={{
                transform:this.props.show ? 'translateY(0)' :'translateY(-100vh)',
                opacity:this.props.show ? '1' :'0'
              
          
            }}>
            { console.log('props.show:',this.props.show)}
            {this.props.children}
            </div>
            </Aux>);
    }
}

export default Modal;