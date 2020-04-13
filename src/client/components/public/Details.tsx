import * as React from 'react';
import '../../scss/app';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment';

class Details extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            blog: {
                id: null,
                title: null,
                content: null,
                authorid: null,
                _created: null,
                firstname: null,
                lastname: null
            },
            blogtag: null
        };
    }

    private editBtn: JSX.Element = null;


    async componentDidMount() {
        if (User && User.role === 'admin') {
            this.editBtn = <button className="btn btn-outline-info mx-1" onClick={() => this.props.history.push(`/edit/${this.props.match.params.id}`)}>
                Edit
            </button>;
        }

        try {
            let blog = await json(`/api/blogs/${this.props.match.params.id}`);
            let blogtag = await json(`/api/blogtags/${this.props.match.params.id}`);
            this.setState({ blog: blog[0], blogtag: blogtag[0].name });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="container my-5">
                <div className="d-flex align-items-center">
                    <h1>{this.state.blog.title}</h1>
                    <span className="badge badge-primary mx-3">{this.state.blogtag}</span>
                </div>

                <p className="font-weight-light font-italic">Written by {this.state.blog.firstname} {this.state.blog.lastname}</p>
                <p>{this.state.blog.content}</p>
                <p className="font-italic font-weight-lighter small-font">Posted on {moment(this.state.blog._created).utc().format("dddd, MMMM Do, YYYY")}</p>


                <button className="btn btn-outline-secondary" onClick={() => this.props.history.push('/')}>
                    Go Back
                    </button>
                {this.editBtn}


            </div>
        );
    }
}

export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    blog: {
        id: number,
        title: string,
        content: string,
        authorid: number,
        _created: string,
        firstname: string,
        lastname: string
    },
    blogtag: string
}

export default Details;
