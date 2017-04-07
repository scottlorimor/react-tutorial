class Records extends React.Component {
	constructor(props) {
		super(props)
		this.addRecord = this.addRecord.bind(this)
		this.deleteRecord = this.deleteRecord.bind(this)
		this.credits = this.credits.bind(this)
		this.debits = this.debits.bind(this)
		this.balance - this.balance.bind(this)
		this.state = {
			records: props.data
		}
	}

	componentDidMount() {
		console.log("Yes, mounted.")
	}

	addRecord(record) {
		var records = React.addons.update(this.state.records, {$push: [record]});
		this.setState({
			records: records
		})
	}

    deleteRecord(record) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
        this.setState({ records: records });
    }

	credits() {
		return this.state.records.filter((record) => {
			return record.amount >= 0
		}).reduce((prev, curr) => {
			return prev + parseFloat(curr.amount)
		}, 0)
	}

	debits() {
		return this.state.records.filter((record) => {
			return record.amount < 0
		}).reduce((prev, curr) => {
			return prev + parseFloat(curr.amount)
		}, 0)
	}

	balance() {
		return this.debits() + this.credits()
	}


	render() {
		// var records = this.state.records.map((record) => {
		// 	return <Record key={record.id} record={record} />
		// })
		return (
			<div className="records">
			{console.log(this.props)}
				<h2 className="title">
				Records
				</h2>
				<div className="row">
					<AmountBox type="success" amount={this.credits()} text="credits" />
					<AmountBox type="danger" amount={this.debits()} text="debits" />
					<AmountBox type="info" amount={this.balance()} text="balance" />
				</div>
				
				<RecordForm handleNewRecord={this.addRecord} />
				<hr />
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Title</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					{this.state.records.map((record) => {
						return <Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord} />
					})}
					</tbody>
				</table>
			</div>
		)
	}
}


