import * as React from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import SelectMenu from '../public/SelectMenu';


class NewPost extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tag: '',
            blogtags: [],
            saveStatus: null
        }
    }

    private alert: JSX.Element = null;
    private saving: boolean = false;


    async componentDidMount() {

        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        } else {
            try {
                let blogtags = await json('/api/blogtags');
                this.setState({ blogtags });
            } catch (error) {
                console.log(error);
            }
        }

    }

    async handleBlogSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.saving) return;

        if (this.state.title === '' || this.state.content === '' || this.state.tag === '') {
            alert("All fields were not filled in - please fill in all fields to submit!");
        } else {

            try {
                let result = await json('/api/blogs', 'POST', { title: this.state.title, content: this.state.content, authorid: User.userid });
                if (result) {
                    await json('/api/blogtags', 'POST', { blogid: result.insertId, tag: this.state.tag });
                    this.setState({ saveStatus: 'successful' });
                    setTimeout(() => this.props.history.push('/'), 800);
                } else {
                    this.setState({ saveStatus: 'error' });
                }
                
            } catch (e) {
                this.setState({ saveStatus: 'error' });
                throw e;
            } finally {
                this.saving = false;
            }
        }
    };

    render() {

        if (this.state.saveStatus === 'successful') {
            this.alert = <div className="alert alert-success p-1 m-3" role="alert">Blog Added</div>
        } else if (this.state.saveStatus === 'error') {
            this.alert = <div className="alert alert-danger p-1 m-3" role="alert">Error Adding Blog</div>
        }

        return (
            <div className="my-5 py-3 container bg-light border rounded shadow-lg">
                <form onSubmit={(e) => this.handleBlogSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="author">Title</label>
                        <input type="text" className="form-control" placeholder="Enter title here:"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select className="form-control" name="tags"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tag: e.target.value })}>
                            <SelectMenu tags={this.state.blogtags} />
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="commentText">Content</label>
                        <textarea className="form-control" rows={3} placeholder="Enter content here:"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-outline-success" id="addButton">
                        Add Blog!
                    </button>
                    {this.alert}
                </form>
            </div >
        );
    }
}



export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    title: string;
    content: string;
    tag: string;
    blogtags: Array<{ id: number, name: string }>;
    saveStatus: string;
}

export default NewPost;



