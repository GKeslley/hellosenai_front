import { Avatar, Box, Container, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Title from "../../../components/Title";
import SidebarInfos from "../Sidebar";
import Sidebar from "../Sidebar";
import ButtonComponent from "../../../components/Button";

const ChallengeInfos = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    return <Box component="section"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      flexGrow: '1'
    }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box>
            <Paper sx={{borderRadius: '0', marginBottom: '2rem'}}>
                <List sx={{display: 'flex', alignItems: 'start'}}>
                    <ListItem sx={{width: 'max-content'}}><Typography>Desafios</Typography></ListItem>
                    <ListItem sx={{width: 'max-content'}}><Typography>Desafios Realizados</Typography></ListItem>
                </List>
            </Paper>

            <Container sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Box sx={{display: 'grid', background: 'red', height: '15rem', borderRadius: '6px'}}>
                    <Box sx={{alignSelf: 'end'}}>
                        <Title>Desafios</Title>
                        <Typography>Leonardo Lucena</Typography>
                    </Box>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <Paper sx={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
                        <Typography>Poste um novo desafio!</Typography>
                        <ButtonComponent size='small'>Criar Desafio</ButtonComponent>
                    </Paper>

                    <Paper sx={{display: 'flex', flexDirection: 'column', padding: '1rem'}}>
                        <Box sx={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                            <Avatar />
                            <Box>
                                <Typography>Leonardo Lucena</Typography>
                                <Typography component='time'>23 nov</Typography>
                            </Box>
                        </Box>
                        
                        <Box>
                            <Typography>Proposta de Avaliação de Relatório de Testes de Software</Typography>
                            <Typography>
                                Objetivo

                                O objetivo desta proposta é avaliar a qualidade do
                                software desenvolvido no Trabalho de Conclusão de Curso (TCC) por meio da
                                realização de um relatório de testes. O relatório deverá conter os resultados
                                dos testes de unidade, teste de caixa branca, teste de caixa preta, teste de
                                integração e aceitação.


                                Metodologia


                                A avaliação será realizada em duas etapas:


                                ·        
                                Planejamento dos testes: Nessa etapa, a equipe
                                deverá definir os critérios de aceitação do software, identificar os casos de
                                teste e planejar a execução dos testes.


                                ·        
                                Execução dos testes: Nessa etapa, a equipe
                                deverá executar os testes planejados e registrar os resultados.
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    </Box>
}

export default ChallengeInfos