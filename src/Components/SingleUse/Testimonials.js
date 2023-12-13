{/* <h1>TESTIMONIALS</h1>
                    <IconButton onClick={handleDrawerOpen} sx={{ marginBottom: 2 }}>
                        <Avatar src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                    </IconButton>

                    <SwipeableDrawer
                        anchor="bottom"
                        open={drawerOpen}
                        onClose={handleDrawerClose}
                        onOpen={() => { }}
                        sx={{ textAlign: 'center' }}
                    >
                        <div style={{ padding: 16 }}>
                            <Card>
                                <CardContent>
                                    <Avatar
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        sx={{ width: 80, height: 80, margin: 'auto', marginBottom: 2 }}
                                    />
                                    <Typography variant="h6" gutterBottom>
                                        {testimonials[currentIndex].name}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {testimonials[currentIndex].role}
                                    </Typography>
                                    <Typography variant="body1">{testimonials[currentIndex].content}</Typography>
                                </CardContent>
                            </Card>
                            <div style={{ marginTop: 16 }}>
                                <IconButton onClick={handlePrevTestimonial}>
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <IconButton onClick={handleNextTestimonial}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </div>
                        </div>
                    </SwipeableDrawer> */}