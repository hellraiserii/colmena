import { Injectable } from '@angular/core'

import { Setting } from '../../../lib/lb-sdk/models'
import { SettingApi } from '../../../lib/lb-sdk/services'

@Injectable()
export class SettingsService {

  public icon = 'icon-settings'
  public title = 'Settings'

  public fields = [
    'key',
    'value',
    'description',
    'type',
  ]

  public formConfig = {
    fields: [
      { name: 'key', label: 'Key', type: 'text', placeholder: 'Key' },
      { name: 'value', label: 'Value', type: 'text', placeholder: 'Value' },
      { name: 'description', label: 'Description', type: 'text', placeholder: 'Description' },
    ],
  }

  public tableConfig = {
    class: 'table table-bordered table-striped table-condensed',
    columns: [
      { field: 'key', label: 'Key', link: 'edit' },
      { field: 'value', label: 'Value' },
      { field: 'description', label: 'Description' },
    ],
    rowButtons: [
      { class: 'btn btn-sm btn-outline-danger', icon: 'fa fa-fw fa-trash', click: (item) => this.deleteItem(item.id) },
    ],
  }

  private item: any= new Setting()
  private items: any[]

  constructor(private settingApi: SettingApi) {
  }

  deleteItem(id) {
    return this.settingApi.deleteById(id).subscribe(
      () => this.getItems(),
      err => console.error(err)
    )
  }

  getItem(id) {
    if (id) {
      return this.settingApi.findById(id).subscribe(res => this.item = res)
    } else {
      this.newItem()
    }
  }

  getItems() {
    return this.settingApi.find().subscribe(res => (this.items = res))
  }

  newItem() {
    this.item = new Setting()
  }

  upsertItem(successCb, errorCb): void {
    this.settingApi.upsert(this.item).subscribe(successCb, errorCb)
  }

}