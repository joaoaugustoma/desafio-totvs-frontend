import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from "../../services/cliente.service";
import {PoNotificationService, PoTableColumn} from "@po-ui/ng-components";
import {Cliente} from "../../models/Cliente";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @ViewChild('modalCriarCliente', { static: false }) modalCriarCliente: any;

  formCriarCliente: any

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
    }
  ]
  colunasTelefones: Array<PoTableColumn> = [
    {property: 'telefone', label: 'Telefone'},
    {
      property: 'acoes',
      label: 'Ações',
      type: 'icon',
      sortable: false,
      icons: [
        {
          action: this.deleteTelefone.bind(this),
          icon: 'po-icon-delete',
          tooltip: 'Excluir Telefone',
          value: 'excluir'
        }
      ]
    }
  ];

  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder, private poNotificationService: PoNotificationService) {
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

  salvarCliente() {
    const cliente = this.formCriarCliente.value as Cliente;
    this.clienteService.salvar(cliente).subscribe((data: Cliente) => {
      this.listarClientes();
      this.modalCriarCliente.close();
    }, error => {
      error.error.forEach((erro: any) => {
        this.poNotificationService.error(erro.erroMensagem);
      });
    });
  }

  addtelefone() {
    const telefonesFormArray = this.formCriarCliente.get('telefones') as FormArray;
    telefonesFormArray.push(this.criarFormControlTelefone(''));
  }

  deleteTelefone(index: number) {
    const telefonesFormArray = this.formCriarCliente.get('telefones') as FormArray;
    telefonesFormArray.removeAt(index);
  }

  criarFormControlTelefone(telefone: string): FormGroup {
    return this.formBuilder.group({
      telefone: [telefone],
    });
  }
}
