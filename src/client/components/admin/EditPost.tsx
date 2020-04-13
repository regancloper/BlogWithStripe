import * as React from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


class EditPost extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }


    async componentDidMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        } else {
            try {
                let blog = await json(`/api/blogs/${this.props.match.params.id}`);
                this.setState({ title: blog[0].title, content: blog[0].content });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async deletePost(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        try {
            let result = await json(`/api/blogs/${this.props.match.params.id}`, 'DELETE');
            if (result) {
                this.props.history.push('/');
            } else {
                // this.setState({ saveStatus: 'error' });
            }
        } catch (e) {
            // this.setState({ saveStatus: 'error' });
            throw e;
        }
    };


    async editPost(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        try {
            let result = await json(`/api/blogs/${this.props.match.params.id}`, 'PUT', { title: this.state.title, content: this.state.content });
            if (result) {
                this.props.history.push('/');
            } else {
                // this.setState({ saveStatus: 'error' });
            }
        } catch (e) {
            // this.setState({ saveStatus: 'error' });
            throw e;
        }
    };

    render() {
        return (
            <div className="container my-5">
                <div className="mx-auto w-50 p-3 bg-light border shadow-lg rounded">
                    <form>
                        <div className="form-group">
                            <label htmlFor="location">Title</label>
                            <input type="text" className="form-control" id="location" defaultValue={this.state.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}

                            />
                            <label htmlFor="commentText">Insert comment here</label>
                            <textarea className="form-control" rows={6} defaultValue={this.state.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-info mr-1" onClick={(e) => this.editPost(e)}>
                                Submit Edits
                            </button>
                            <button type="submit" className="btn btn-outline-danger" onClick={(e) => this.deletePost(e)}>
                                Delete Blog
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}



export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    title: string;
    content: string;
}

export default EditPost;


