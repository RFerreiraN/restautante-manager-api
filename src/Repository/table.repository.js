import { Table } from '../Models/table.model.js'

export class TableRepository {
  static createTable(data) {
    return Table.create(data)
  }

  static updateTableById(id, data) {
    return Table.findByIdAndUpdate(id, data, { new: true })
  }

  static disableTable(id) {
    return Table.findByIdAndUpdate(id, { status: 'disabled' }, { new: true })
  }

  static getAllTables() {
    return Table.find()
  }

  static getTableById(id) {
    return Table.findById(id)
  }

  static getTableByStatus(status) {
    return Table.find({ status })
  }

  static changeStatusTable(id, status) {
    return Table.findByIdAndUpdate(id, { status }, { new: true })
  }
}
