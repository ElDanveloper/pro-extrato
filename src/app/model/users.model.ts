export class Users {
    Id: number = 0
    Email: string = ''
    PhoneCell: string = ''
    TypeUser: string = ''  //E: Empresa, C: Contador, S: Suporte
    PerfilUser: string = ''
    Active: boolean = false
    UserPassword: string = ''
    SimpleName: string = ''
    CaminhoFoto: string = ''
    DepartmentId: string = ''
    PersonId: string = ''
    UserIdSupervisor: string = ''

    static checkbox() {
        return ['Active']
    }
    
    static relacionamentos() {
        return ['DepartmentId', 'PersonId', 'UserIdSupervisor']
    }

    static referencias() {
        return [{chave: 'DepartmentId', referencia: 'Department'}, {chave: 'PersonId', referencia: 'Person'}, {chave: 'UserIdSupervisor', referencia: 'Users'}]
    }

    static expanded() {
        return ['DepartmentId', 'PersonId', 'UserIdSupervisor']
    }
}