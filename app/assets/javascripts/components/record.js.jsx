class Record extends React.Component {
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)		
	}

	handleDelete(event) {
		event.preventDefault()
		$.ajax({
			method: 'DELETE',
			url: "records/" + this.props.record.id,
			dataType: 'JSON',
			success: (() => {
				this.props.handleDeleteRecord(this.props.record)
			})
		})
	}

	render() {
		return (
			<tr>
			{console.log(this.props)}
				{/*why record and not records?
				where am I defining record on props? 
				*/}

				<td>{this.props.record.title}</td>
				<td>{this.props.record.date}</td>
				<td>{this.props.record.amount}</td>
				<td>
					<a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
				</td>
			</tr>
		)
	}
}