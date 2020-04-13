import * as React from 'react';
import moment from 'moment';
import { json } from '../../utils/api';
import '../../scss/app';
import { Link, RouteComponentProps } from 'react-router-dom';


class Blogs extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props)
        this.state = {
            blogs: []
        };
    }

    private alert: JSX.Element = null;

    async componentDidMount() {
        try {
            let blogs = await json('/api/blogs');
            this.setState({ blogs });
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        if (this.props.location.state) {
            this.alert = <div className="alert alert-success p-1 m-3" role="alert">
                {this.props.location.state.confirmation}
            </div>;
        }

        return (
            <div className="container my-5">
                {this.alert}
                <div className="card-columns">
                    {this.state.blogs.map(blog => {
                        return (
                            <div key={blog.id} className="card">
                                <img className="card-img-top" src="https://i.ytimg.com/vi/Fxi__sNIE1Q/maxresdefault.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <h5>
                                        <Link to={`/details/${blog.id}`} className="card-title text-secondary">{blog.title}</Link>
                                    </h5>
                                    <p className="card-text line-clamp">{blog.content}</p>
                                    <small className="card-text"><i>Written by {blog.firstname} {blog.lastname}</i></small>
                                    <p className="card-text"><small className="text-muted">
                                        {moment(blog._created).utc().format("MMMM Do, YYYY")}
                                    </small></p>
                                </div>

                            </div>
                        );


                    })}
                </div>
            </div>



        );
    }
}

export interface IAppProps extends RouteComponentProps {
    location: any
}

export interface IAppState {
    blogs: Array<{
        id: number,
        title: string,
        content: string,
        authorid: number,
        _created: string,
        firstname: string,
        lastname: string
    }>;
}

export default Blogs;
