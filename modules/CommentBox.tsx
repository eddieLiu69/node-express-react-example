import * as React from 'react';
import * as marked from 'marked';

interface ICommentProps extends React.Props<any>, React.HTMLAttributes {
    key: number;
    author: string;
    text?: string;
}

class CommentForm extends React.Component<any, any> {
    render() {
        return (
            <div className="commentForm" >
                Hello, world!I am a CommentForm.
                </div>
        );
    }
}

class Comment extends React.Component<ICommentProps, any> {
    rawMarkup(raw) {
        var rawMarkup = marked(raw, { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment" >
                <h2 className="commentAuthor" >
                    { this.props.author }
                    </h2>
                <span dangerouslySetInnerHTML={ this.rawMarkup(this.props.text) } />
                </div>
        );
    }
}

class CommentList extends React.Component<{ data: ICommentProps[] }, any> {
    render() {
        var nodes = this.props.data.map((comment) => <Comment author={comment.author} key={comment.key} text={comment.text} />);
        return (<div className="commentList">{nodes}</div>);
    }
}

var data: ICommentProps[] = [
    { key: 1, author: "Pete Hunt", text: "This is one comment" },
    { key: 2, author: "Jordan Walke", text: "This is *another* comment" }
];

class CommentBox extends React.Component<{ url: string }, any> {
    private data: ICommentProps[];
    private url: string = '/api/comments';

    getInitialState() {
        return { data: [] };
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({ data: data });
            },
            error: (xhr, status, err) => {
                console.error(this.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, 500);
    }

    render() {
        return (
            <div className="commentBox" >
                <h1>Comments</h1>
                <CommentList data={ this.state.data } />
                <CommentForm />
                </div>
        );
    }
}
export default CommentBox;

// var CommentList = React.createClass<{ data: IComment[]}, any>({
//     render: function() {
//         var nodes = this.props.data.map((comment) => <Comment author={comment.author} id={comment.id} text={comment.text} />);
//         return (
//             <div className="commentList" >
//                 {nodes}
//             </div>
//         );
//   }
// });

// var CommentForm = React.createClass({
//     render: function() {
//         return (
//             <div className="commentForm" >
//                 Hello, world!I am a CommentForm.
//                 </div>
//         );
//     }
// });

// var Comment = React.createClass<IComment, any>({
//     rawMarkup: (raw) => {
//         var rawMarkup = marked(raw, { sanitize: true });
//         return { __html: rawMarkup };
//     },
//     render: function() {
//         return (
//             <div className="comment" >
//             <h2 className="commentAuthor" >
//             { this.props.author }
//                 </h2>
//             < span dangerouslySetInnerHTML= { this.rawMarkup(this.props.children.toString()) } />
//                 </div>
//         );
//     }
// });

// var CommentBox = React.createClass({
//     data = [],
//     loadData: () => {
//         this.data = data;
//     },
//     componentWillMount: function () {
//         console.log('CommentBox componentWillMount');
//         this.loadData();
//     },
//     render: function () {
//         return (
//             <div className="commentBox" >
//             <h1>Comments </h1>
//             <CommentList data={ this.data } />
//             <CommentForm />
//             </div>
//     );
//   }
// });

// export default CommentBox;