# 🏨 Hotel Fácil — Frontend

Interface web para o sistema de reservas Hotel Fácil. Desenvolvida com Angular 19, permite buscar hotéis, verificar disponibilidade de quartos e gerenciar reservas.

---

## 🔗 Links

| Recurso | URL |
|---|---|
| Aplicação em produção | https://hotel-reservation-front-xi.vercel.app |
| API (backend) | https://hotel-reservation-production-e49c.up.railway.app |
| Swagger da API | https://hotel-reservation-production-e49c.up.railway.app/swagger-ui/index.html |

---

## 📋 Funcionalidades

- **Login e registro** de usuários com autenticação JWT
- **Lista de hotéis** com slideshow de imagens e navegação
- **Disponibilidade de quartos** — filtragem por data de check-in e check-out
- **Criação de reservas** com cálculo automático de valor total
- **Listagem e cancelamento** de reservas do hóspede
- Ambiente de produção separado por arquivo de environment (`environment.prod.ts`)

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Angular 19 |
| Linguagem | TypeScript |
| Estilização | CSS puro (sem frameworks) |
| HTTP | Angular HttpClient |
| Roteamento | Angular Router |
| Testes | Karma + Jasmine |
| Build | Angular CLI 19 |
| Deploy | Vercel |

---

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 18+
- Angular CLI 19

```bash
npm install -g @angular/cli
```

### 1. Clone o repositório

```bash
git clone https://github.com/Artur-Arantes/hotel-reservation-front.git
cd hotel-reservation-front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Por padrão, a aplicação aponta para `http://localhost:8080` em desenvolvimento.  
O arquivo de configuração está em `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

Se quiser apontar para a API de produção localmente, edite esse arquivo com a URL do Railway.

### 4. Execute

```bash
ng serve
```

Acesse `http://localhost:4200`.

> O backend precisa estar rodando para a aplicação funcionar. Veja o [README do backend](https://github.com/Artur-Arantes/hotel-reservation-back).

---

## 🐳 Rodando com Docker

```bash
# Build da imagem
docker build -t hotel-facil-front .

# Execução
docker run -p 80:80 hotel-facil-front
```

Acesse `http://localhost`.

> O build dentro do Docker usa a configuração de desenvolvimento (`environment.ts`), então o frontend aponta para `http://localhost:8080`. Certifique-se de que o backend está rodando localmente antes de subir o container. Para produção, o Vercel cuida do deploy com a URL correta da API.

---

## 🏗️ Build de produção

```bash
ng build --configuration=production
```

Os arquivos gerados ficam em `dist/hotel-reservation/browser/`.  
Em produção, o Angular substitui automaticamente `environment.ts` por `environment.prod.ts`, que aponta para a API no Railway.

---

## 🧪 Testes

```bash
ng test
```

31 testes distribuídos entre serviços e componentes, usando `HttpClientTestingModule` para mockar as chamadas HTTP.

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfaces TypeScript (Hotel, Room, Reservation...)
│   │   ├── services/        # HotelService, RoomService, ReservationService, AuthService
│   │   └── utils/           # Utilitários (caminhos de imagens)
│   └── features/
│       ├── auth/
│       │   └── login/       # Tela de login e registro
│       ├── hotels/
│       │   └── hotel-list/  # Lista de hotéis com slideshow
│       └── reservations/
│           ├── reservation-form/  # Formulário de criação de reserva
│           └── reservation-list/ # Listagem e cancelamento de reservas
├── environments/
│   ├── environment.ts       # Desenvolvimento (localhost)
│   └── environment.prod.ts  # Produção (Railway)
└── public/
    └── images/              # Imagens de hotéis, quartos e slideshow
```
