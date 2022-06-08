export class PersonFisical {
    public Id: number = 0
    public ContractorId: number = 0
    public Naturalness: string = ''
    public Nationality: string = ''
    public Race: string = ''
    public BloodType: string = ''
    public CnhNumber: string = ''
    public CnhCategory: string = ''
    public CnhMaturty: any = ''
    public VoterTitle: string = ''
    public VoterTitleZone: string = ''
    public VoterTitleSection: string = ''
    public ReservistNumber: string = ''
    public ReservistCategory: string = ''
    public MotherName: string = ''
    public FatherName: string = ''
    public CommercialReferency: string = ''
    public IncomeMonthly: number = 0
    public Profession: string = ''
    public LocalJob: string = ''
    public StateCivil: string = ''
    public CnhOrganEmitter: string = ''
    public CnhExpedition: any = ''
    public ConjugateCompanion: string = ''
    public LevelFormation: number = 0
    public PisDateRegister: any = ''
    public PisNumber: string = ''
    public PisBank: string = ''
    public PisAgency: string = ''
    public PisAgencyDigit: string = ''
    public CtpsNumber: string = ''
    public CtpsSerie: string = ''
    public CtpsDateExpedition: any = ''
    public CtpsUf: string = ''
    public GrauInstruction: string = ''
    public NrRic: string = ''
    public OrganEmitterRic: string = ''
    public DataExpeditionRic: any = ''
    public NrRne: string = ''
    public OrganEmitterRne: string = ''
    public DataExpeditionRne: any = ''
    public CodCityBirth: number = 0
    public UfBirth: string = ''
    public CodPaisBirthRfb: number = 0
    public CodPaisNacionalityRfb: number = 0
    public NrInscOrgabClass: string = ''
    public EmitterOrganClass: string = ''
    public DateExpeditionOrgClass: any = ''
    public DateValidOrgClass: any = ''
    public ForeignDtArrival: any = ''
    public ForeignDtNaturalization: any = ''
    public ForeignMarriedBr: string = ''
    public ForeignSonBr: string = ''
    public DefFisical: boolean = false
    public DefVisual: boolean = false
    public DefAuditory: boolean = false
    public DefMental: boolean  = false
    public DefIntelectual: boolean = false
    public Rehabilitated: boolean = false
    public DateBirth: any = ''
    public Rg: string = ''
    public OrganRg: string = ''
    public DateEmitterRg: any = ''
    public Sex: string = ''
    public SocialName: string = ''
    public PersonId: string = '' //HunnoClass.TPessoa{...}


    constructor () {}

    static datas() {
        return ['CnhMaturty', 'CnhExpedition', 'PisDateRegister', 'CtpsDateExpedition', 'DataExpeditionRic', 'DateExpeditionOrgClass', 'DateValidOrgClass', 'ForeignDtArrival', 'ForeignDtNaturalization', 'DateBirth', 'DateEmitterRg']
    }

    static checkbox() {
        return ['DefFisical','DefVisual','DefAuditory', 'DefMental','DefIntelectual', 'Rehabilitated']
    }

    static relacionamentos() {
        return ['PersonId']
    }

    static referencias() {
        return [{chave: 'PersonId', referencia: 'Pessoa'}]
    }

    static expanded() {
        return ['PersonId']
    }
}