import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chats } from 'src/app/models/chats';
import { Compradores } from 'src/app/models/compradores';
import { Compras } from 'src/app/models/compras';
import { Mensajes } from 'src/app/models/mensajes';
import { Vendedores } from 'src/app/models/vendedores';
import { ChatsService } from 'src/app/services/chats.service';
import { CompradoresService } from 'src/app/services/compradores.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  idVendedores: number = 0;
  mensajeForm!: FormGroup;
  compra: Compras = new Compras();
  comprador: Compradores = new Compradores();
  vendedorSeleccionado: Vendedores = new Vendedores();
  chats: Chats[] = [];
  mensajes: Mensajes[] = [];
  vendedor: Vendedores[] = [];

  constructor(
    private chatsService: ChatsService,
    private compradoresService: CompradoresService,
    private vendedoresService: VendedoresService,
    private mensajesService: MensajesService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idVendedores = this.route.snapshot.params['id'];
    this.mensajeForm = this.formBuilder.group({
      mensaje: [''],
    });

    // Obtener el nombre de usuario del servicio de inicio de sesión
    let username = this.loginService.getUsername();

    // Buscar el comprador por su nombre de usuario
    this.compradoresService.findByUsername(username).subscribe((comprador) => {
      this.comprador = comprador;

      // Si existe un idVendedores en la URL, crear un chat con ese vendedor
      if (this.idVendedores !== 0) {
        this.vendedoresService.listId(this.idVendedores).subscribe((vendedor) => {
          this.chatsService.findByCompradorAndVendedor(this.comprador.idCompradores, this.idVendedores).subscribe((chat) => {
            if (!chat) {
              // Si no existe un chat, crear uno nuevo
              let nuevoChat = new Chats();
              nuevoChat.comprador = this.comprador;
              nuevoChat.vendedor = vendedor;
              this.chatsService.insert(nuevoChat).subscribe((chatInsertado) => {
                this.chats.push(chatInsertado);
                this.seleccionarVendedor(vendedor);
              });
            } else {
              this.seleccionarVendedor(vendedor);
            }
          });
        });
      }

      // Buscar los chats del comprador
      this.chatsService.findByComprador(this.comprador.idCompradores).subscribe((chats) => {
        this.chats = chats;

        // Si no existe un idVendedores en la URL y hay chats, seleccionar el primer chat y cargar sus mensajes
        if (this.idVendedores === 0 && this.chats.length > 0) {
          this.seleccionarVendedor(this.chats[0].vendedor);
        }
      });
    });
  }

  enviarMensaje(): void {
    if (this.mensajeForm.valid) {
      let { mensaje } = this.mensajeForm.value;

      let username = this.loginService.getUsername();
      this.compradoresService
        .findByUsername(username)
        .subscribe((comprador) => {
          this.comprador = comprador;

          // Verificar si el comprador es el mismo que el vendedor
          if (this.comprador.user.id === this.idVendedores) {
            this.snackBar.open(
              'No puedes enviarte mensajes a ti mismo',
              'Cerrar',
              {
                duration: 2000,
              }
            );
            return;
          }

          // Buscar el chat existente entre el comprador y el vendedor
          this.chatsService
            .findByCompradorAndVendedor(
              this.comprador.idCompradores,
              this.idVendedores
            )
            .subscribe((chat) => {
              if (!chat) {
                // Si no existe un chat, crear uno nuevo
                let nuevoChat = new Chats();
                nuevoChat.comprador = this.comprador;
                this.vendedoresService
                  .listId(this.idVendedores)
                  .subscribe((vendedor) => {
                    nuevoChat.vendedor = vendedor;
                    this.chatsService
                      .insert(nuevoChat)
                      .subscribe((chatInsertado) => {
                        this.enviarMensajeAlChat(mensaje, chatInsertado);
                      });
                  });
              } else {
                this.enviarMensajeAlChat(mensaje, chat);
              }
            });
        });
    } else {
      this.snackBar.open('Por favor, escribe un mensaje válido', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  enviarMensajeAlChat(mensaje: string, chat: Chats) {
    let nuevoMensaje = new Mensajes();
    nuevoMensaje.mensaje = mensaje;
    nuevoMensaje.chat = chat;

    this.mensajesService.insert(nuevoMensaje).subscribe(() => {
      this.snackBar.open('Mensaje enviado', 'Cerrar', {
        duration: 2000,
      });
      // Actualizar la lista de mensajes
      this.seleccionarVendedor(this.vendedorSeleccionado);
    });
  }

  seleccionarVendedor(vendedor: Vendedores) {
    this.vendedorSeleccionado = vendedor;

    // Cargar los mensajes entre el comprador y el vendedor seleccionado
    this.chatsService
      .findByCompradorAndVendedor(
        this.comprador.idCompradores,
        vendedor.idVendedores
      )
      .subscribe((chat) => {
        if (chat) {
          this.mensajesService
            .findByChat(chat.idChats)
            .subscribe((mensajes) => {
              this.mensajes = mensajes;
            });
        } else {
          this.mensajes = [];
        }
      });
  }
}
