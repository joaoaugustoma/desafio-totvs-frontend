import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../services/cliente.service";
import {PoDialogService, PoTableColumn} from "@po-ui/ng-components";
import {Cliente} from "../../models/Cliente";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  formCriarCliente: FormGroup = new FormGroup({})

  clientes: Cliente[] = [];

  colunas: Array<PoTableColumn> = [
    {property: 'nome', label: 'Nome'},
    {property: 'endereco', label: 'Endereço'},
    {property: 'bairro', label: 'Bairro'},
    {
      property: 'telefones',
      label: 'Telefones',
      type: 'detail',
      detail: {
        columns: [
          {property: 'telefone', label: 'Telefone'}
        ]
      }
    },
    {
      property: 'acoes',
      label: 'Ações',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.editarCliente.bind(this),
          icon: 'po-icon-edit',
          tooltip: 'Editar Cliente',
          value: 'editar'
        }
      ]
    }
  ]

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.criarFormInclusaoCliente();
    this.listarClientes();
  }

  criarFormInclusaoCliente() {
    this.formCriarCliente = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      endereco: [''],
      bairro: [''],
      telefones: this.formBuilder.array([this.criarFormInclusaoTelefone('')])
    });
  }

  private criarFormInclusaoTelefone(telefone: string): FormGroup {
    return this.formBuilder.group({
      telefone: [telefone]
    });
  }


  listarClientes() {
    this.clienteService.listar().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  editarCliente(cliente: Cliente) {
    console.log(cliente);
  }

  salvarCliente() {

  }

  deleteTelefone(i: number) {

  }

  addtelefone() {
    const phonesFormArray = this.formCriarCliente.get('telefones') as FormArray;
    phonesFormArray.push(this.criarFormInclusaoTelefone(''));
  }
}
