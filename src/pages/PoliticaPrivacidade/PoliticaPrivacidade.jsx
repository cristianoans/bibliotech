import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import { ThemeColorContext } from "../../contexts/ThemeColorContext";
import "./PoliticaPrivacidade.css"



export function PoliticaPrivacidade() {

    const { temaEscuro } = ThemeColorContext();
    return (
        <div className={temaEscuro === 'dark' ? "principalPrivacidade" : ""}>
            <Container>
                <h1 className="pageTitle">Política de Privacidade Bibliotech</h1>

            </Container>

            <Container>

                <Tabs className="mb-3" bsPrefix='nav nav-tabs'>
                    <Tab eventKey="seguranca" title="Coleta de Dados">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header> Dados do Usuário</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Coletamos os Dados do usuário conforme ele nos fornece, de forma direta ou indireta, no acesso e uso dos site.
                                        </ListGroup.Item>
                                        <ListGroup.Item>Bibliotech utiliza Cookies e identificadores anônimos para controle de audiência, navegação, segurança e publicidade, sendo que o usuário concorda com essa utilização ao aceitar essa Política de Privacidade.
                                        </ListGroup.Item>
                                        <ListGroup.Item>Os Dados Pessoais do usuário também serão excluídos quando estes não forem mais necessários, exceto na ocorrência de justificativa legal ou contratual para a sua manutenção (exemplificativamente, para cumprir eventual obrigação legal de retenção de dados ou necessidade de preservação destes para preservar direitos e interesses legítimos de uma das partes envolvidas na contratação).

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="politicas" title="Privacidade">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header> Armazenamento dos Dados</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Os Dados coletados são armazenados em local seguro. A qualquer momento o USUÁRIO poderá solicitar a exibição, correção ou exclusão de seus Dados.
                                        </ListGroup.Item>
                                        <ListGroup.Item>Os Dados obtidos do usuário poderão ser armazenados em servidor próprio ou de terceiro contratado para esse fim, sejam eles alocados no Brasil ou no exterior, podendo ainda ser armazenados por meio de tecnologia de cloud computing e/ou outras que surjam futuramente.
                                        </ListGroup.Item>
                                        <ListGroup.Item> Bibliotech poderá, para fins de auditoria e preservação de direitos, permanecer com o histórico de registro dos Dados do usuário, possuindo faculdade de excluí-los definitivamente mediante sua conveniência ou nas hipóteses em que lei ou norma regulatória exigirem.

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>


                    </Tab>
                    <Tab eventKey="condicoes" title="Disposições Gerais">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Informações Legais</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Bibliotech poderá atualizar esse documento a qualquer momento.
                                            Assim, consulte-o com frequência. Se terceirizarmos qualquer atividade, garantiremos que as empresas contratadas obedeçam a todas as disposições deste documento.
                                        </ListGroup.Item>
                                        <ListGroup.Item>O teor desta Política de Privacidade poderá ser atualizado ou
                                            modificado a qualquer momento, conforme a finalidade ou conveniência, tal qual para adequação e conformidade legal de disposição de lei ou norma que tenha força jurídica equivalente, cabendo ao usuário verificá-la sempre que efetuar o acesso aos site.
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </Tab>
                </Tabs>
            </Container >
        </div>

    );
}