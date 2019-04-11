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
    ReactS3.uploadFile(file, config)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}

class Mediauploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            file : null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
        console.log(this.state);
        uploadFile(this.state.file)
    }

    
    render(){
        return (<div>
                <input type="file" onChange={ (e) => this.handleChange(e.target.files) }/>   
                <button className="btn btn-primary" onClick={this.handleUpload}>upload</button>         
        </div>);
    }

}

export default Mediauploader;