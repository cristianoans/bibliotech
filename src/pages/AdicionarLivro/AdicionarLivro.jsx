
import { Button, Container, FloatingLabel, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";
import "./AdicionarLivro.css";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";

export function AdicionarLivro() {
    const { temaEscuro } = ThemeColorContext();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const tooltipAddLivro = <Tooltip>Clique para adicionar o livro à biblioteca </Tooltip>;

    function onSubmit(data) {
        const imagem = data.imagem[0];
        if (imagem) {
            const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data).then(() => {
                    toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            addLivro(data).then(() => {
                toast.success("Livro adicionado com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/livros");
            })
        }

    }

    return (
        <div className="adicionar-livro">
            <Container>
                <h1>Adicionar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <div id="linha1" className="row">
                        <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mx-1 mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", { required: "Título é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.titulo?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mx-1 mb-3">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.autor?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-1 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mx-1 mb-3">
                                <Form.Label>Páginas</Form.Label>
                                <Form.Control type="number" className={errors.isbn && "is-invalid"} {...register("npaginas", { required: "Quantidade de páginas é obrigatório!" })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.npaginas?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mx-1 mb-3">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" className={errors.categoria && "is-invalid"} {...register("categoria", { required: "Categoria é obrigatória!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.categoria?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3 mx-1">
                                <Form.Label>Editora</Form.Label>
                                <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("editora", { required: "Editora é obrigatório!", maxLength: { value: 50, message: "Limite de 50 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.editora?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3 mx-1">
                                <Form.Label>Data de publicação</Form.Label>
                                <Form.Control type="date" className={errors.isbn && "is-invalid"} {...register("datapublicacao", { required: "Data de publicação é obrigatório!" })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.datapublicacao?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3  mx-1">
                                <Form.Label>Idioma</Form.Label>
                                <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("idioma", { required: "Idioma é obrigatório!", maxLength: { value: 50, message: "Limite de 50 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.idioma?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3 mx-1">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("isbn", { required: "ISBN é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                                <Form.Text className="invalid-feedback">
                                    {errors.isbn?.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3 mx-1">
                                <Form.Label>Imagem da capa</Form.Label>
                                <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <FloatingLabel className="mb-3 mx-1" controlId="floatingTextarea2" label="Resumo do livro">
                            <Form.Control className={errors.isbn && "is-invalid"} as="textarea" style={{ height: '100px' }}
                                {...register("resumo", { required: "Resumo é obrigatório!", maxLength: { value: 2500, message: "Limite de 2500 caracteres!" } })} />
                            <Form.Text className="invalid-feedback">
                                {errors.resumo?.message}
                            </Form.Text>
                        </FloatingLabel>
                    </div>
                    <OverlayTrigger placement="bottom" overlay={tooltipAddLivro}>
                        <Button type="submit" variant="success">Adicionar</Button>
                    </OverlayTrigger>
                </Form>
            </Container>
        </div>
    )
}