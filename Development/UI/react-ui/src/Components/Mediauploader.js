import React, {Component} from 'react';
import {css} from 'emotion';
import AuthStore from '../Store/AuthStore';
import Emojify from 'react-emojione';
import ReactS3 from 'react-s3';

const config = {
    bucketName: 'cs5500',
    albumName: 'temp',
    region: 'us-east-1',
    accessKeyId: 'AKIA2MS5HQUYVLXCTZPI',
    secretAccessKey: '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',
}

function uploadFile(file){
    return ReactS3.uploadFile(file, config);
}

class Mediauploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            file : null,
            path: '',
            editProfilePic:false,
            uploading:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.onEditProfilePicClick = this.onEditProfilePicClick.bind(this);
        this.onSaveProfilePicClick = this.onSaveProfilePicClick.bind(this);
        this.onCancelProfilePicClick = this.onCancelProfilePicClick.bind(this);

        this.onPathChanges = this.onPathChanges.bind(this);
        
    }
    

    handleChange(selectorFiles)
    {
        this.setState({
            file:selectorFiles[0],
        });
        console.log(selectorFiles[0]);
        
    }

    handleUpload(e){
        e.preventDefault();
        this.setState({
            message:"uploading...",
        })
        console.log(this.state);
        uploadFile(this.state.file)
            .then((data) => {
                console.log(data);
                this.setState({message:"",path:data.location})
            })
            .catch((err) => {
                this.setState({message:"Could not upload"})
                console.error(err);
                
            });
    }

   
    onEditProfilePicClick(){
        this.setState({
            editProfilePic:true,
        })
    }

    onSaveProfilePicClick(){
        this.setState({
            editProfilePic:false,
        })
        this.props.onSave(this.state.path);
    }

    onCancelProfilePicClick(){
        this.setState({
            editProfilePic:false,
        })
    }

    onProfilePicChange(e){
        e.preventDefault();
        this.setState({
            profilePicture:e.target.value,
        })
    }


    onPathChanges(e){
        e.preventDefault();
        this.setState({
            path:e.target.value,
        })
    }
    renderProfileEdit(){
       let style = {
           position:"fixed",
           left:"50px",
           bottom:"50px",
           zIndex:"1000",
           width:"80%",
       }
        return(

            <div class="" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={style}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content" style={({backgroundColor:"#999"})}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload picture</h5>
                        
                    </div>
                    <div class="modal-body">
                    {this.state.message}
                    <br/>
                    <input type="file" onChange={ (e) => this.handleChange(e.target.files) }/> 
                    <br/>  
                    <button className="btn btn-primary" onClick={this.handleUpload}>upload</button>         

                        {/* <input type="text" value={this.state.profilePicture} onChange={this.onPathChanges}></input> */}
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveProfilePicClick}>Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={this.onCancelProfilePicClick} data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>

            </div>

            
        )
    }

    
    render(){
        return (<div>
                <a href="#" onClick={this.onEditProfilePicClick} data-toggle="modal" data-target="#exampleModal">
                <i className='fa fa-image'
                    style={{
                            fontSize: '1.5em',
                            marginLeft: 10,
                            color: 'white'
                        }}/>
                    </a>
                {this.state.editProfilePic===true?this.renderProfileEdit():''}
       
        </div>);


    }

}

export default Mediauploader;